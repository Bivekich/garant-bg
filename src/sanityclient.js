import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:

// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: "bq3y85tx",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "v1", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
export async function getGivedgarantes() {
  const givedgarantes = await client.fetch('*[_type == "givedgarantes"]');
  return givedgarantes;
}
export async function getFAQ() {
  const faq = await client.fetch('*[_type == "faq"]');
  return faq;
}
export async function getAboutus() {
  const query = `*[_type == "aboutus"][0]{
    "image": image.asset->url,
    title,
    text,
  }`;
  const aboutus = await client.fetch(query);
  return aboutus;
}

export async function getGarantes() {
  const query = `*[_type == "garantes"][0]`;
  const result = await client.fetch(query);
  return result;
}
export async function gettitlegarantes() {
  const query = `*[_type == "titlegarantes"][0]`;
  const result = await client.fetch(query);
  return result;
}
export async function getGarantTypes() {
  const query = `*[_type == "garantTypes"]`;
  const result = await client.fetch(query);
  return result;
}
export async function getGarantType(id) {
  const query = `*[_id == "${id}"][0]`;
  const result = await client.fetch(query);
  return result;
}
export async function getBanks() {
  const query = `*[_type == "banks"]{
  title,
  "image": image.asset->url
  }`;
  const result = await client.fetch(query);
  return result;
}
