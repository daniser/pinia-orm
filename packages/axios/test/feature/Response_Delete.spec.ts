import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Model } from 'pinia-orm'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { assertState } from '../helpers'
import { useAxiosRepo } from '../../src'

describe('Feature - Response - Save', () => {
  let mock: MockAdapter

  class User extends Model {
    static entity = 'users'

    static fields () {
      return {
        id: this.attr(null),
        name: this.attr(''),
      }
    }
  }

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })
  afterEach(() => {
    mock.reset()
  })

  it('can save response data manually', async () => {
    mock.onGet('/api/users').reply(200, { id: 1, name: 'John Doe' })

    const userStore = useAxiosRepo(User)

    const response = await userStore.api().get('/api/users')

    assertState({
      users: {
        1: { id: 1, name: 'John Doe' },
      },
    })

    response.config.delete = 1

    await response.delete()

    assertState({ users: {} })
  })

  it('throws error if `delete` option is not set', async () => {
    mock.onGet('/api/users').reply(200, { id: 1, name: 'John Doe' })

    const userStore = useAxiosRepo(User)

    const response = await userStore.api().get('/api/users')

    try {
      await response.delete()
    } catch (e: any) {
      expect(e.message).toBe(
        '[Pinia ORM Axios] Could not delete records because the `delete` option is not set.',
      )

      return
    }

    throw new Error('Error was not thrown')
  })
})
