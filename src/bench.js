import { crypto } from "aws-crt";
import { createHash } from "node:crypto";
import { equal } from "assert";

const generateBuffer = (size) => {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) buf[i] = parseInt(Math.random() * 256);
  return buf;
};

for (const algorithm of ["sha1", "sha256"]) {
  for (const bufferSizeInKB of [16, 64, 256, 1024]) {
    const testBuffer = generateBuffer(bufferSizeInKB * 1024);

    const nodeHash = createHash(algorithm).update(testBuffer).digest("hex");
    const crtHash = Buffer.from(crypto.hash_sha256(testBuffer).buffer).toString(
      "hex"
    );
    equal(nodeHash, crtHash);
  }
}
