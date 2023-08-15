import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

function Logout() {
    const router = useRouter()
    const doLogout = useCallback(async () => {
        await axios.get('/api/logout')
        router.replace('/auth/login')
    }, [router])
    useEffect(() => {
        doLogout()
    }, [doLogout])
    return (
        <div>Logout success</div>
    )
}

export default Logout