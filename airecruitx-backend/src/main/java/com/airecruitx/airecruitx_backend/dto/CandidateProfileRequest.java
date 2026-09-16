package com.airecruitx.airecruitx_backend.dto;

import jakarta.validation.constraints.NotBlank;

public class CandidateProfileRequest {

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Headline is required")
    private String headline;

    private String bio;

    private Integer experienceYears;

    public CandidateProfileRequest() {
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }
}