import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import userLogIn from '@/libs/userLogIn'
import getUserProfile from '@/libs/getUserProfile'

describe('Remote User Log-In', () => {
  var logInPromise:Promise<Object>
  var logInJsonResult:Object
  var token:string
  var profilePromise:Promise<Object>
  var profileJsonResult:Object
  const email = "ILoveKaru3000@gmail.com"
  const password = "1212312121"
  beforeAll(async () => {
    logInPromise = userLogIn(email, password)
    logInJsonResult = await logInPromise

    token = logInJsonResult.token
    profilePromise = getUserProfile(token)
    profileJsonResult = await profilePromise
  })

  it('userLogIn must return correct results', () => {
    expect(logInJsonResult.email).toMatch(/test1@testmail.com/i) 
  })

  it('getUserProfile must return correct results', () => {
    var profileData = profileJsonResult.data
    expect(profileData.email).toMatch(/test1@testmail.com/i)
    expect(profileData.role).toMatch(/user/i)
  })
})
