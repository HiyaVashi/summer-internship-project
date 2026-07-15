package com.project.employee_management.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    public String generateReport(String prompt)
            throws IOException, InterruptedException {

        HttpClient client = HttpClient.newHttpClient();

        ObjectMapper mapper = new ObjectMapper();

        String requestBody = """
        {
          "model":"llama-3.3-70b-versatile",
          "messages":[
            {
              "role":"user",
              "content":%s
            }
          ]
        }
        """.formatted(
                mapper.writeValueAsString(prompt)
        );

        HttpRequest request = HttpRequest.newBuilder()

                .uri(
                        URI.create(
                                "https://api.groq.com/openai/v1/chat/completions"
                        )
                )

                .header("Authorization", "Bearer " + apiKey)

                .header("Content-Type", "application/json")

                .POST(
                        HttpRequest.BodyPublishers.ofString(
                                requestBody
                        )
                )

                .build();

        HttpResponse<String> response = client.send(

                request,

                HttpResponse.BodyHandlers.ofString()

        );

        JsonNode root = mapper.readTree(response.body());

        if(root.has("error")){

            return root.get("error")
                    .toPrettyString();

        }

        return root

                .get("choices")

                .get(0)

                .get("message")

                .get("content")

                .asText();

    }

}