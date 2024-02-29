import React from 'react'

const Header = () => {
    return (
        <>
                <nav class="navbar navbar-expand-lg bg-body-tertiary p-0">
                    <div class="container-fluid">
                       <div>
                       <h1 class="navbar-brand pb-0">Covid 19</h1>
                        <p>Live Traker Dashboard</p>
                       </div>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <form class="d-flex" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>
                    </div>
                </nav>
        </>
    )
}

export default Header