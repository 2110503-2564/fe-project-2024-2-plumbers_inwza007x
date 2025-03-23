import '@testing-library/jest-dom'
import getDentist from '@/libs/getDentist'

describe('Get Dentist by ID', () => {
  	var DentistByIdPromise:Promise<Object>
  	var DentistJsonResult:Object
	var Dentist_ID = 
	var Dentist_name = 
  	beforeEach(async () => {
  	  	DentistByIdPromise = getDentist(Dentist_ID)
    		DentistJsonResult = await DentistByIdPromise
  	})

  	it('getDentist must return correct result', () => {
    		const resultData = DentistJsonResult.data
    		expect(resultData.name).toMatch(new RegExp(Dentist_name, 'i') 
  	})
})