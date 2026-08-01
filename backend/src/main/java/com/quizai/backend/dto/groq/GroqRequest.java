package com.quizai.backend.dto.groq;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroqRequest {

    private String model;

    private List<Message> messages;

}