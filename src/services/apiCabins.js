import supabase, { supabaseUrl } from './supabase'

// read 小屋数据
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

// delete 小屋数据
export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }

  return data
}

// create 创建小屋 和 update 编辑小屋
export async function createEditCabin(newCabin, id) {
  //判断传入的图片是新上传的还是已有的
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  // 给上传的文件生成一个唯一文件名，避免重复
  const imageName = !hasImagePath
    ? `${Date.now()}-${newCabin.image.name}`.replaceAll('/', '')
    : null

  //  图片存储路径示例如下：
  //  https://erddkbcfunxmuhukaruh.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 拼接出文件的完整访问 URL（<img> 就用这个显示）
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. 创建或更新小屋数据
  let query = supabase.from('cabins')
  let queryResult

  if (!id) {
    // a) 创建新小屋
    queryResult = await query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single()
  } else {
    // b) 编辑现有小屋
    queryResult = await query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select()
      .single()
  }

  const { data, error } = queryResult

  if (error) {
    console.error(error)
    throw new Error(
      id ? 'Cabin could not be updated' : 'Cabin could not be created'
    )
  }

  // 2. 只有在需要上传新图片时才上传到 Supabase Storage
  if (hasImagePath) return data

  if (!hasImagePath && imageName) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image)

    // 3. 如果图片上传失败，就删除掉数据库中刚刚插入的 cabin 记录，保持一致性
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id)
      console.error(error)
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not created'
      )
    }
    return data
  }
}
