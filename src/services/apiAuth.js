import supabase, { supabaseUrl } from './supabase'

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  })

  if (error) {
    console.error('Signup error:', error)
    throw new Error(error.message)
  }

  return data
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  return data
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  // console.log(data)

  if (error) throw new Error(error.message)

  return data?.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) throw new Error(error.message)
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. 更新 password or fullName
  // 因为密码只能在 Auth 内部表更新。
  // 头像、昵称只能在 metadata（或者 profile 表）更新。
  // Supabase 的 updateUser API 一次请求只能修改 一类信息。

  let updateData
  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message)
  if (!avatar) return data

  // 2. 上传avatar文件到 Storage
  const fileName = `avatar-${data.user.id}-${Date.now()}`

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar)

  if (storageError) throw new Error(storageError.message)

  // 3. 更新 user 的 avatar: 把头像 URL 存到用户 metadata
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  })

  if (error2) throw new Error(error2.message)

  return updatedUser
}
