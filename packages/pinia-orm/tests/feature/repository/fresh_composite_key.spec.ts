import { describe, it, expect } from 'vitest'

import { Model, Attr, Str, useRepo } from '../../../src'
import { assertState } from '../../helpers'

describe('feature/repository/fresh_composite_key', () => {
  class User extends Model {
    static entity = 'users'

    static primaryKey = ['idA', 'idB']

    @Attr() idA!: any
    @Attr() idB!: any
    @Str('') name!: string
  }

  it('inserts records with the composite key', () => {
    const userRepo = useRepo(User)

    userRepo.fresh([
      { idA: 1, idB: 2, name: 'John Doe' },
      { idA: 2, idB: 1, name: 'Jane Doe' },
    ])

    assertState({
      users: {
        '[1,2]': { idA: 1, idB: 2, name: 'John Doe' },
        '[2,1]': { idA: 2, idB: 1, name: 'Jane Doe' },
      },
    })
  })

  it('throws if the one of the composite key is missing', () => {
    expect.assertions(1)

    const userRepo = useRepo(User)

    expect(() => {
      userRepo.insert({ idA: 1, name: 'John Doe' })
    }).toThrow()
  })
})
