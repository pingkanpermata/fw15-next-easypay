import React from "react";
import http from "../helpers/http";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/reducers/profile";

function TopUp({ token, style }) {
    const [valueTopUp, setValueTopUp] = React.useState('')
    const [openModal, setOpenModal] = React.useState(false)
    const dispatch = useDispatch()
    const amount = useSelector(state => state.transfer.amount)
    const [loading, setLoading] = React.useState(false)

    const getProfile = React.useCallback(async () => {
        const { data } = await http(token).get('/profile')
        dispatch(setProfile(data.results))
    }, [token, dispatch])

    React.useEffect(() => {
        getProfile()
    }, [getProfile])

    const doTopUp = async (e) => {
        e.preventDefault()
        const { value: amount } = e.target.amount
        const form = new URLSearchParams({ amount }).toString()
        const { data } = await http(token).post('/transactions/topup', form)
        dispatch(setProfile(data.results))
        setOpenModal(false)
    }

    return (
        <>
            <label htmlFor='pin-topup' className={`${style} cursor-pointer`} onClick={() => setOpenModal(true)}>TopUp</label>
            <input type="checkbox" id="pin-topup" className="modal-toggle" checked={openModal} />
            <div className="modal">
                <div className="modal-box flex bg-[#dac387] flex-col gap-4">
                    <h3 className="font-bold text-lg">Top Up</h3>
                    <p className="py-4">Enter the amount of money, and click submit</p>
                    <form onSubmit={doTopUp}>
                        <input name='amount' type="number" placeholder='Input Amount' className='input input-bordered w-full' />
                        <div className="modal-action">
                            <button className="btn bg-[#302b1e] hover:bg-[#857752]" onClick={() => setOpenModal(false)}>Submit</button>
                        </div>
                    </form>
                    <button className="modal-backdrop btn w-20 bg-[#302b1e] hover:bg-[#857752] mt-[-60px]" htmlFor="pin-topup" onClick={() => setOpenModal(false)}>Close</button>
                </div>
            </div>
        </>
    )
}

export default TopUp