package com.airecruitx.airecruitx_backend.ai;

import com.openai.client.OpenAIClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
// import org.springframework.stereotype.Service;

// @Service
public class OpenAIService {

    private final OpenAIClient client;

    public OpenAIService(OpenAIClient client) {
        this.client = client;
    }

    public String testPrompt() {

        ResponseCreateParams params = ResponseCreateParams.builder()
                .input("Reply with exactly: AI RecruitX connection successful.")
                .model(ChatModel.GPT_5_2)
                .build();

        Response response = client.responses().create(params);

        return response.output().stream()
                .flatMap(item -> item.message().stream())
                .flatMap(message -> message.content().stream())
                .flatMap(content -> content.outputText().stream())
                .map(outputText -> outputText.text())
                .findFirst()
                .orElse("No response text received.");
    }
}