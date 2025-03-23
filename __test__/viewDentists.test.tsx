import '@testing-library/jest-dom'
import getDentists from '@/libs/getDentists'
import DentistCatalog from '@/components/DentistCatalog'
import { screen, render, waitFor } from '@testing-library/react'

describe('Get Dentists', () => {
	var DentistPromise:Promise<Object>
  	var DentistsJsonResult:Object
	var Dentists_count:number = 12
  	beforeEach(async () => {
    		DentistPromise = getDentists()
    		DentistsJsonResult = await DentistPromise
  	})

  	it('getDentists must return correct results', () => {
    		const resultData = DentistsJsonResult.data
    		expect(DentistsJsonResult.count).toBe(Dentists_count) 
	 	expect(resultData).toHaveLength(Dentists_count)
  	})

	it('Dentists Catalog should have correct number of images', async () => {
    		const catalog = await DentistCatalog({DentistsJson: DentistsJsonResult})
    		render(catalog) 
    
    		await waitFor(()=> {
      			const DentistImages = screen.queryAllByRole('img')
      			expect(DentistImages.length).toBe(3)
    		})
  	})
})
