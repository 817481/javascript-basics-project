"use strict";

const mockData = require("./mockData.js").data;
const prompt = require("prompt-sync")();

// Function to collect and validate user information
function collectUserInfo() {
  let userProfile = {};

  // Collect and validate first name
  do {
    userProfile.first_name = prompt("What is your first name? ").trim();
  } while (!/^[a-zA-Z]+$/.test(userProfile.first_name));

  // Collect and validate last name
  do {
    userProfile.last_name = prompt("What is your last name? ").trim();
  } while (!/^[a-zA-Z]+$/.test(userProfile.last_name));

  // Collect and validate age
  do {
    userProfile.age = Number(prompt("How old are you? "));
  } while (isNaN(userProfile.age) || userProfile.age < 18);

  // Collect and validate minimum age interest
  do {
    userProfile.min_age_interest = Number(
      prompt("What is the minimum age you are interested in? ")
    );
  } while (
    isNaN(userProfile.min_age_interest) ||
    userProfile.min_age_interest < 18
  );

  // Collect and validate maximum age interest
  do {
    userProfile.max_age_interest = Number(
      prompt("What is the maximum age you are interested in? ")
    );
  } while (
    isNaN(userProfile.max_age_interest) ||
    userProfile.max_age_interest < userProfile.min_age_interest
  );

  // Collect and validate gender
  do {
    userProfile.gender = prompt("What is your gender (M/F/X)? ").toUpperCase();
  } while (!["M", "F", "X"].includes(userProfile.gender));

  // Collect and validate gender interest
  do {
    userProfile.gender_interest = prompt(
      "What gender are you interested in (M/F/X)? "
    ).toUpperCase();
  } while (!["M", "F", "X"].includes(userProfile.gender_interest));

  // Collect and validate location
  do {
    userProfile.location = prompt(
      "Do you live in a city or rural area? "
    ).toLowerCase();
  } while (!["city", "rural"].includes(userProfile.location));

  return userProfile;
}

// Function to check if a profile matches the user's criteria
function isMatch(user, profile) {
  return (
    profile.age >= user.min_age_interest &&
    profile.age <= user.max_age_interest &&
    user.age >= profile.min_age_interest &&
    user.age <= profile.max_age_interest &&
    profile.gender_interest === user.gender &&
    user.gender_interest === profile.gender &&
    profile.location === user.location
  );
}

// Collect user information
const userProfile = collectUserInfo();

// Find and count matches
let matches = [];
mockData.forEach((profile) => {
  if (isMatch(userProfile, profile)) {
    matches.push(profile);
  }
});

// Print matches and count
console.log("Matches found:");
matches.forEach((match) => {
  console.log(
    `Name: ${match.first_name} ${match.last_name}, Age: ${match.age}, Location: ${match.location}`
  );
});
console.log(`Total number of matches: ${matches.length}`);
