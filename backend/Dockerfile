# Use an official Rust runtime as the base image
FROM rust:1.73

# Set the working directory in the container to /usr/src/myapp
WORKDIR /usr/src/myapp

# Copy the current directory contents into the container at /usr/src/myapp
COPY . .

# Compile the application
RUN cargo build --release

EXPOSE 8080

# Specify the command to run when the container starts
CMD ["./target/release/lab-next-bff"]
