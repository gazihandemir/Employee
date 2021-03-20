import React, { useEffect } from 'react'
import { useState } from 'react'
const Pagination = ({ pages, setCurrentPage, currentEmployess, sortedEmployees }) => {


    // const pages = 5;

    const numOfPages = [];
    for (let i = 1; i <= pages; i++) {
        numOfPages.push(i);
    }

    const [currentButton, setCurrentButton] = useState(1);

    useEffect(() => {
        setCurrentPage(currentButton)
    }, [currentButton, setCurrentPage])

    return (
        <div className="clearfix">
            <div className="hint-text">Showing <b>{currentEmployess.length}</b> out of <b>{sortedEmployees.length}</b> entries</div>
            <ul className="pagination">
                {/* current buttonun statesi 1 ise ilk sayfadır o yüzden tıklanamaz olsun  */}
                <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item'}`}>
                    {/* prev 1 e eşitse kendisi olsun degilse azalmaya devam etsin */}
                    <a href="#!" className="page-link"
                        onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}
                    >Previous</a>
                </li>
                {
                    numOfPages.map((page, index) => {
                        return (
                            <li key={index}
                                className={`${currentButton === page ? 'page-item active' : 'page-item'}`}>
                                <a href="#!" className="page-link"
                                    onClick={() => setCurrentButton(page)}
                                >{page}</a>
                            </li>
                        )


                    })
                }
                <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}>
                    <a href="#!" className="page-link"
                        onClick={() => setCurrentButton((next) => next === numOfPages.length ? next : next + 1)}
                    >Next</a>
                </li>
            </ul>
        </div >
    )

}

export default Pagination

/* <li className="page-item"><a href="#" className="page-link">1</a></li>
<li className="page-item"><a href="#" className="page-link">2</a></li>
<li className="page-item active"><a href="#" className="page-link">3</a></li>
<li className="page-item"><a href="#" className="page-link">4</a></li>
<li className="page-item"><a href="#" className="page-link">5</a></li>
<li className="page-item"><a href="#" className="page-link">Next</a></li> */