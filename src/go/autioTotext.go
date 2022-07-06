package main

import (
	"context"
	"fmt"
	speech "cloud.google.com/go/speech/apiv1"
	speechpb "google.golang.org/genproto/googleapis/cloud/speech/v1"
)

func main() {
	fmt.Print("")

	ctx := context.Background()

	client, err := speech.NewClient(ctx)
	if err != nil {
		return err
	}
	defer client.Close()

	resp, err := client.Recognize(ctx, &speechpb.RecognizeRequest{
		Config: &speechpb.RecognitionConfig{
			Encoding:        speechpb.RecognitionConfig_LINEAR16,
			SampleRateHertz: 16000,
			LanguageCode:    "en-US",
		},
		Audio: &speechpb.RecognitionAudio_Content{
			Content: "ddd",
		},
	})
}