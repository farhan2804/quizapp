package com.quizai.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizai.backend.dto.QuizQuestion;
import com.quizai.backend.dto.QuizRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroqService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${groq.api.key}")
    private String apiKey;

    public GroqService(RestClient restClient) {
        this.restClient = restClient;
    }

    public List<QuizQuestion> generateQuestions(QuizRequest request) {

        try {

            String prompt = buildPrompt(
                    request.getCategory(),
                    request.getDifficulty(),
                    request.getQuestionCount()
            );

            Map<String, Object> body = new HashMap<>();

            body.put("model", "llama-3.3-70b-versatile");

            body.put("messages", List.of(
                    Map.of(
                            "role", "user",
                            "content", prompt
                    )
            ));

            String response = restClient.post()
                    .uri("https://api.groq.com/openai/v1/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .body(body)
                    .retrieve()
                    .body(String.class);

            JsonNode root = objectMapper.readTree(response);

            String content = root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            // Remove markdown if AI returns ```json
            content = content
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            return objectMapper.readValue(
                    content,
                    new TypeReference<List<QuizQuestion>>() {}
            );

        } catch (Exception e) {

            throw new RuntimeException("Failed to generate AI quiz.", e);

        }

    }

    private String buildPrompt(String category,
                               String difficulty,
                               int questionCount) {

        return """
                Generate %d multiple-choice questions.

                Category: %s
                Difficulty: %s

                Return ONLY valid JSON.

                Format:

                [
                  {
                    "ques":"Question",
                    "optionA":"Option A",
                    "optionB":"Option B",
                    "optionC":"Option C",
                    "optionD":"Option D",
                    "ans":"optionA"
                  }
                ]

                Rules:

                1. Return ONLY JSON.
                2. No explanation.
                3. No markdown.
                4. No ```json.
                5. Correct answer must be one of:
                   optionA
                   optionB
                   optionC
                   optionD
                """.formatted(
                questionCount,
                category,
                difficulty
        );
    }

}