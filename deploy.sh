#!/bin/bash

# Adorna Design - Docker Deployment Script
# This script allows users to choose a port and deploy the application in Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if port is available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1
    else
        return 0
    fi
}

# Function to validate port number
validate_port() {
    local port=$1
    if [[ $port =~ ^[0-9]+$ ]] && [ $port -ge 1024 ] && [ $port -le 65535 ]; then
        return 0
    else
        return 1
    fi
}

# Function to stop existing container
stop_existing_container() {
    if docker ps -q -f name=adorna-design-app | grep -q .; then
        print_status "Stopping existing Adorna Design container..."
        docker compose down
        print_success "Existing container stopped"
    fi
}

# Function to cleanup Docker resources
cleanup_docker() {
    print_status "Cleaning up unused Docker resources..."
    docker system prune -f >/dev/null 2>&1 || true
}

# Main deployment function
deploy_application() {
    local port=$1
    
    print_status "Starting deployment on port $port..."
    
    # Create .env file for docker-compose
    echo "HOST_PORT=$port" > .env
    
    # Build and start the container
    print_status "Building Docker image..."
    docker compose build
    
    print_status "Starting Adorna Design application..."
    if docker compose up -d; then
        print_success "Container started successfully"
    else
        print_error "Failed to start container"
        print_status "Container logs:"
        docker compose logs --tail=20
        exit 1
    fi
    
    # Wait a moment for the container to start
    sleep 5
    
    # Check if container is running
    if docker ps -q -f name=adorna-design-app | grep -q .; then
        print_success "Adorna Design is now running!"
        echo ""
        echo "🎨 =================================="
        echo "🎨  Adorna Design - Portfolio Site"
        echo "🎨 =================================="
        echo ""
        echo "✨ Application URL: http://localhost:$port"
        echo "✨ Container Name: adorna-design-app"
        echo "✨ Status: Running"
        echo ""
        echo "📋 Management Commands:"
        echo "   Stop:    docker compose down"
        echo "   Logs:    docker compose logs -f"
        echo "   Restart: docker compose restart"
        echo ""
        echo "🔧 To deploy on a different port, run this script again"
        echo ""
    else
        print_error "Failed to start the container. Check logs with: docker compose logs"
        exit 1
    fi
}

# Main script execution
main() {
    echo ""
    echo "🎨 ========================================"
    echo "🎨  Adorna Design - Docker Deployment"
    echo "🎨 ========================================"
    echo ""
    
    # Check if Docker is installed and running
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    
    # Check if docker compose is available (v2)
    if ! docker compose version &> /dev/null; then
        print_error "Docker Compose v2 is not available. Please install Docker Compose v2 or update Docker Desktop."
        print_status "Note: Modern Docker installations include Compose v2 by default."
        exit 1
    fi
    
    # Stop any existing container
    stop_existing_container
    
    # Get port from user
    while true; do
        echo ""
        print_status "Please choose a port for the Adorna Design application:"
        echo "  • Port range: 1024-65535"
        echo "  • Default: 6464"
        echo "  • Common alternatives: 6465, 8080, 8081, 9000"
        echo ""
        read -p "Enter port number (or press Enter for 6464): " user_port
        
        # Use default port if none provided
        if [ -z "$user_port" ]; then
            user_port=6464
        fi
        
        # Validate port number
        if ! validate_port "$user_port"; then
            print_error "Invalid port number. Please enter a number between 1024 and 65535."
            continue
        fi
        
        # Check if port is available
        if ! check_port "$user_port"; then
            print_warning "Port $user_port is already in use."
            read -p "Would you like to choose a different port? (y/n): " choice
            if [[ $choice =~ ^[Yy]$ ]]; then
                continue
            else
                print_status "Proceeding with port $user_port (existing service will be displaced)"
                break
            fi
        else
            print_success "Port $user_port is available!"
            break
        fi
    done
    
    # Confirm deployment
    echo ""
    print_status "Deployment Summary:"
    echo "  • Application: Adorna Design Portfolio"
    echo "  • Port: $user_port"
    echo "  • URL: http://localhost:$user_port"
    echo "  • Container: adorna-design-app"
    echo ""
    read -p "Proceed with deployment? (y/n): " confirm
    
    if [[ $confirm =~ ^[Yy]$ ]]; then
        deploy_application "$user_port"
        cleanup_docker
    else
        print_status "Deployment cancelled."
        exit 0
    fi
}

# Run main function
main "$@"
