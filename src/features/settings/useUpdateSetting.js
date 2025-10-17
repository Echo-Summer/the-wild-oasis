import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { updateSetting as updateSettingApi } from '../../services/apiSettings'

export default function useUpdateSetting() {
  // edit settings
  const queryClient = useQueryClient()

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('settings successfully edited')
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      })
      //   reset()
    },

    onError: (err) => toast.error(err.message),
  })

  return { updateSetting, isUpdating }
}
