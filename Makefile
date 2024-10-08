# Define the commands to run in each package
SERVER_CMD = $(MAKE) -C packages/server
DRONE_CMD = $(MAKE) -C packages/drone

.PHONY: all
all: run

.PHONY: run
run:
	@echo "Starting server and drone..."
	@trap 'kill 0' SIGINT; ( \
		$(SERVER_CMD) & \
		$(DRONE_CMD) & \
		firefox http://localhost:3000 & \
		wait \
	)
