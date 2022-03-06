import textToSpeech from "@google-cloud/text-to-speech";
import { google } from "@google-cloud/text-to-speech/build/protos/protos";
import ISynthesizeSpeechRequest = google.cloud.texttospeech.v1.ISynthesizeSpeechRequest;
// import ISynthesizeSpeechResponse = google.cloud.texttospeech.v1.ISynthesizeSpeechResponse;
import { Storage } from "@google-cloud/storage";

import fs from "fs";
import util from "util";

const client = new textToSpeech.TextToSpeechClient();
const storage = new Storage();

const requestJson: ISynthesizeSpeechRequest = {
  // const requestJson = {
  input: {
    text: "卒業シーズンを迎え、三重県南部の御浜町で、春の訪れを告げる「スイートピー」の出荷が最盛期を迎えています。古川園芸では、30年ほど前から、花の栽培に取り組み広さ15アールのハウスで白や紫、ピンク等17種類、約2万株を栽培しています。「スイートピー」は、露地ものだと春から初夏にかけて咲きますが、冬咲きのものは、切り花用として出荷されます。「スイートピー」の花言葉は「門出」・「思い出」ということもあって卒業・入学シーズンにもっとも需要が高く、今年は寒さの影響で生育が遅れ出荷作業が遅れたものの、色づきの良い花が育っているということです。古川園芸では「新型コロナウイルスの影響で、みんな気持ちが落ち込んでいる中、色鮮やかな花を見て元気になってもらえれば」と話していました。「スイートピー」の出荷作業は、4月上旬まで続くということです。",
  },
  voice: {
    languageCode: "ja-JP",
    name: "jp-JP-Wavenet-B",
    ssmlGender: "FEMALE",
  },
  audioConfig: {
    audioEncoding: "MP3",
    effectsProfileId: ["headphone-class-device"],
  },
};

describe("textToSpeech testing", () => {
  test("request to texttospeech ", async () => {
    const [response] = await client.synthesizeSpeech(requestJson);

    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty("audioContent");
    expect(response.audioContent).not.toBeUndefined();

    const writeFile = util.promisify(fs.writeFile);

    await writeFile("./mp3.mp3", <string>response.audioContent, "binary");
  });

  test("request to cloudstorage", async () => {
    await storage.bucket("testtospeech_fsuke").upload("./mp3.mp3", {
      destination: "mp3.mp3",
    });
  });
});
