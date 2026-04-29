# Dev stage only — no multi-stage needed
FROM maven:3.9.6-eclipse-temurin-21
WORKDIR /app

# Cache dependencies first
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Copy source (will be overridden by volume mount)
COPY src ./src

EXPOSE 8080

# spring-boot:run picks up DevTools and recompiles on changes
ENTRYPOINT ["mvn", "spring-boot:run", "-Dspring-boot.run.jvmArguments=-Dspring.devtools.restart.enabled=true"]