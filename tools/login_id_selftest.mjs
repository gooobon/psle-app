// Pure-function self-test for login ID casing and name handling (no network, no Supabase).
import assert from "node:assert/strict";
import { USERNAME_RE, kidEmail, normUsername, usernameKey, usernameIlike, isReservedUsername, cleanNamePart, fullName, suggestLoginId, loginIdProblem } from "../src/lib/supabase/config.js";

assert.ok(USERNAME_RE.test("Aquacat01") && USERNAME_RE.test("aquacat01") && USERNAME_RE.test("A_b"));
assert.ok(!USERNAME_RE.test("ab") && !USERNAME_RE.test("a b c") && !USERNAME_RE.test("a-b-c") && !USERNAME_RE.test("x".repeat(31)));
assert.equal(normUsername("  Aquacat01 "), "Aquacat01");                  // casing preserved
assert.equal(kidEmail("Aquacat01"), kidEmail("aquacat01"));               // same account at login
assert.equal(usernameKey("Aquacat01"), usernameKey("aquacat01"));
assert.equal(usernameIlike("A_b%"), "a\\_b\\%");                          // _ and % are not wildcards
assert.ok(isReservedUsername("Admin"));
assert.equal(loginIdProblem(""), "");
assert.equal(loginIdProblem("Aquacat01"), "");
assert.equal(loginIdProblem("joon hee"), "Spaces aren't allowed in the login ID");
assert.match(loginIdProblem("joon-hee"), /"-" isn't allowed/);
assert.match(loginIdProblem("ab"), /at least 3/);
assert.equal(cleanNamePart("  Joon   Hee "), "Joon Hee");
assert.equal(fullName(" Joon  Hee ", " Kim "), "Joon Hee Kim");
assert.equal(fullName("JoonHee", ""), "JoonHee");
assert.equal(suggestLoginId("Joon Hee", "Kim"), "JoonHeeKim");
assert.equal(suggestLoginId(" Mei  Lin", ""), "MeiLin");
console.log("login_id_selftest: ALL PASS");
