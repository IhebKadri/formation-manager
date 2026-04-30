package com.example.formation_backend.services;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Async
    public void sendPasswordEmail(String toEmail, String login, String plainPassword) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // multipart = true for both HTML and plain text
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariable("login", login);
            context.setVariable("password", plainPassword);

            String htmlContent = templateEngine.process("emailTemplate", context);
            
            // Plain text version for better deliverability
            String plainText = "Bienvenue sur Formation Manager !\n\n" +
                    "Bonjour " + login + ",\n\n" +
                    "Votre compte a été créé. Voici vos identifiants :\n" +
                    "Identifiant : " + login + "\n" +
                    "Mot de passe : " + plainPassword + "\n\n" +
                    "Connectez-vous ici : http://localhost:5173/login\n\n" +
                    "Cordialement,\n" +
                    "L'équipe Formation Manager";

            helper.setFrom(fromEmail, "Formation Manager");
            helper.setTo(toEmail);
            helper.setReplyTo(fromEmail);
            helper.setSubject("Bienvenue sur Formation Manager - Vos identifiants");
            
            // Set both plain text and HTML
            helper.setText(plainText, htmlContent);

            mailSender.send(message);
            log.info("Email HTML envoyé avec succès à {}", toEmail);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de l'email à {} : {}", toEmail, e.getMessage());
        }
    }
}
