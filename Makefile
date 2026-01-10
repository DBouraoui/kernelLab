.PHONY: deploy

push-image:
	docker buildx build --platform linux/amd64,linux/arm64 -t dbouraoui/kernallab:latest --push .


