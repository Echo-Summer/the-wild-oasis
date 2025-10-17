import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createEditCabin } from '../../services/apiCabins'

export default function useCreateCabin() {
  const queryClient = useQueryClient()

  //create
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabinData) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success('New cabin successfully created')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
      //   reset()
    },

    onError: (err) => toast.error(err.message),
  })

  return { createCabin, isCreating }
}
