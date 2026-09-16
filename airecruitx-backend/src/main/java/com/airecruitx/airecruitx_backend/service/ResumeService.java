
package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.entity.Application;
import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.Resume;
import com.airecruitx.airecruitx_backend.entity.User;

import com.airecruitx.airecruitx_backend.repository.ApplicationRepository;
import com.airecruitx.airecruitx_backend.repository.CandidateRepository;
import com.airecruitx.airecruitx_backend.repository.ResumeRepository;
import com.airecruitx.airecruitx_backend.repository.UserRepository;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final CandidateRepository candidateRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    // Resolve to an absolute path so upload and download use
    // the same directory from the backend working directory.
    private final Path uploadDirectory =
            Paths.get("uploads", "resumes")
                    .toAbsolutePath()
                    .normalize();

    public ResumeService(
            ResumeRepository resumeRepository,
            CandidateRepository candidateRepository,
            ApplicationRepository applicationRepository,
            UserRepository userRepository) {

        this.resumeRepository = resumeRepository;
        this.candidateRepository = candidateRepository;
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    // CANDIDATE - UPLOAD RESUME
    @Transactional
    public Resume uploadResume(
            String email,
            MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Resume file cannot be empty"
            );
        }

        if (!"application/pdf".equalsIgnoreCase(
                file.getContentType())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only PDF resumes are allowed"
            );
        }

        Candidate candidate =
                candidateRepository.findByUserEmail(email)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Candidate profile not found"
                                )
                        );

        Files.createDirectories(uploadDirectory);

        String originalName = file.getOriginalFilename();

        if (originalName == null || originalName.isBlank()) {
            originalName = "resume.pdf";
        }

        // Avoid using an untrusted original filename as a path.
        String storedFileName =
                UUID.randomUUID() + ".pdf";

        Path filePath =
                uploadDirectory.resolve(storedFileName)
                        .normalize();

        if (!filePath.startsWith(uploadDirectory)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid resume file path"
            );
        }

        byte[] fileBytes = file.getBytes();

        // Validate that the uploaded file can be read as a PDF.
        String extractedText;

        try (PDDocument document =
                     Loader.loadPDF(fileBytes)) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            extractedText = stripper.getText(document);
        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Uploaded file is not a valid PDF"
            );
        }

        Files.write(filePath, fileBytes);

        Resume resume =
                resumeRepository
                        .findByCandidateId(candidate.getId())
                        .orElse(new Resume());

        resume.setFileName(originalName);
        resume.setFileType("application/pdf");
        resume.setFilePath(filePath.toString());
        resume.setExtractedText(extractedText);
        resume.setUploadedAt(LocalDateTime.now());
        resume.setCandidate(candidate);

        return resumeRepository.save(resume);
    }

    // RECRUITER - VIEW CANDIDATE RESUME
    @Transactional(readOnly = true)
    public Resource getResumeForRecruiter(
            Long applicationId,
            String recruiterEmail) throws IOException {

        Application application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Application not found"
                                )
                        );

        User recruiter =
                userRepository.findByEmail(recruiterEmail)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Recruiter account not found"
                                )
                        );

        if (application.getJob() == null
                || application.getJob().getRecruiter() == null
                || application.getJob().getRecruiter().getId() == null) {

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Application job or recruiter information is missing"
            );
        }

        Long jobRecruiterId =
                application.getJob().getRecruiter().getId();

        if (!jobRecruiterId.equals(recruiter.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to view this resume"
            );
        }

        if (application.getCandidate() == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Candidate profile not found for this application"
            );
        }

        Resume resume =
                resumeRepository
                        .findByCandidateId(
                                application.getCandidate().getId()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "This candidate has not uploaded a resume"
                                )
                        );

        if (resume.getFilePath() == null
                || resume.getFilePath().isBlank()) {

            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Resume file path is missing"
            );
        }

        Path savedPath =
                Paths.get(resume.getFilePath())
                        .toAbsolutePath()
                        .normalize();

        // Ensure the file is within the configured resume folder.
        if (!savedPath.startsWith(uploadDirectory)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Invalid resume storage path"
            );
        }

        if (!Files.exists(savedPath)
                || !Files.isRegularFile(savedPath)
                || !Files.isReadable(savedPath)) {

            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Resume file is missing from the server"
            );
        }

        return new UrlResource(savedPath.toUri());
    }
}