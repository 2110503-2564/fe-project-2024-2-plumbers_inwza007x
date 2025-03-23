import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import userRegister from '@/libs/userRegister'

describe("register",() => {
	var registerPromise: Promise<Object>
	var registerJsonResult: Object
	var token: string
	var profilePromise: Promise<Object>
	var profileJsonResult: Object

	beforeAll(async () => {
		const email = "test1@testmail.com"
    		const password = "Test1234"
		registerPromise = userRegister(email, password)
		registerJsonResult = await registerPromise
	})

	it("userRegister must return correct results", () => {
		expect(registerJson.email).toMatch(/test1@testmail.com/i)
	})
})