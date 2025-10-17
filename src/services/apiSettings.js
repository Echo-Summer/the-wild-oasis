import supabase from './supabase'

/**
 * 封装了 对全局配置 (settings 表) 的读写操作：
 * getSettings() → 读取酒店的全局设置。
 * updateSetting(newSetting) → 修改全局设置。
 */

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single()

  if (error) {
    console.error(error)
    throw new Error('Settings could not be loaded')
  }
  return data
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Settings could not be updated')
  }
  return data
}
