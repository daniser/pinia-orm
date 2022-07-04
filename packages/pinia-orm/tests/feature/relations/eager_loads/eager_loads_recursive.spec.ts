import { describe, it, expect } from 'vitest'

import { Model, Attr, Str, HasOne, BelongsTo, useRepo } from '../../../../src'
import { assertModel } from '../../../helpers'

describe('feature/relations/eager_loads_recursive', () => {
  class User extends Model {
    static entity = 'users'

    @Attr() id!: number
    @Str('') name!: string

    @HasOne(() => Phone, 'userId')
    // eslint-disable-next-line no-use-before-define
    phone!: Phone
  }

  class Phone extends Model {
    static entity = 'phones'

    @Attr() id!: number
    @Attr() userId!: number
    @Str('') number!: string

    @BelongsTo(() => User, 'userId')
    user!: User
  }

  it('eager loads all relations recursively', () => {
    const usersRepo = useRepo(User)
    const phonesRepo = useRepo(Phone)

    usersRepo.save({ id: 1, name: 'John Doe' })
    phonesRepo.save({ id: 1, userId: 1, number: '123-4567-8912' })

    const user = usersRepo.withAllRecursive().first()!

    expect(user.phone.user).toBeInstanceOf(User)
    expect(user.phone.user.phone).toBeInstanceOf(Phone)
    expect(user.phone.user.phone.user).toBeInstanceOf(User)
    assertModel(user.phone.user.phone.user, {
      id: 1,
      name: 'John Doe',
    })
  })

  it('eager loads all relations with a given recursion limit', () => {
    const usersRepo = useRepo(User)
    const phonesRepo = useRepo(Phone)

    usersRepo.save({ id: 1, name: 'John Doe' })
    phonesRepo.save({ id: 1, userId: 1, number: '123-4567-8912' })

    const user = usersRepo.withAllRecursive(1).first()!

    expect(user.phone.user).toBeInstanceOf(User)
    assertModel(user.phone.user, {
      id: 1,
      name: 'John Doe',
    })
  })
})
