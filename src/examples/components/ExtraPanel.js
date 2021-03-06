import React from 'react'
import { Map } from 'immutable'
import { useToggleState } from '../state'
import { paths, getAddress } from '../context'
import { useBrixWorker, BoundedSuspense } from '../../brix'
import Address from './AddressWithProps'
// import Address from './Address'

const MyWorkingComponent = () => {
  const { value } = useBrixWorker(paths.address.get(), getAddress, Map())
  return (
    <Address datum={value} />
  )
}

const ExtraPanel = () => {
  const { value, ...showAddressState } = useToggleState(true)

  return (
    <div>
      <button
        type='button'
        {...showAddressState}
      >
        {value ? 'Hide ' : 'Show '}
        Address
      </button>
      {value && (
        <BoundedSuspense fallback={<div>working it...</div>}>
          <MyWorkingComponent />
        </BoundedSuspense>
      )}
    </div>
  )
}

export default ExtraPanel
