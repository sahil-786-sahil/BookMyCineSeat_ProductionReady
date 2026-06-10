# Step 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-22-jammy AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Step 2: Create the runtime image
FROM eclipse-temurin:22-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]