/**
 * useAnggotaRegistration - Public composable for member registration
 */
export const useAnggotaRegistration = () => {
  const loading = ref(false)
  const step = ref(1)

  const nextStep = () => { step.value++ }
  const prevStep = () => { if (step.value > 1) step.value-- }

  return { loading, step, nextStep, prevStep }
}
