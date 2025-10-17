import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createEditCabin } from '../../services/apiCabins'

export default function useEditCabin() {
  // edit
  const queryClient = useQueryClient()

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('cabin successfully edited')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
      //   reset()
    },

    onError: (err) => toast.error(err.message),
  })

  return { editCabin, isEditing }
}
