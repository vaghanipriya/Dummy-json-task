import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const App = () => {
    const [data, setdata] = useState();
    const [data1, setdata1] = useState();
    const [category, setcategory] = useState("all");
    const [pagenumber, setpagenumber] = useState(0);
    const [searchProduct, setsearchProduct] = useState("");
    const [pricefilter, setpricefilter] = useState("all");

    const serverdata = () => {
        axios
            .get(`https://dummyjson.com/products`)
            .then((res) => {
                // console.log(res);
                // setdata(res.data.products)
                setdata1(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        serverdata();
    }, []);

    // category data

    useEffect(() => {
        let filterData = data1;
        if (category !== "all") {
            filterData = filterData.filter((data) => data.category === category);
        }

        // radio button

        if (pricefilter !== "all") {
            filterData = filterData.filter((data) => {
                if (pricefilter === "option4") {
                    return data1;
                } else if (pricefilter === "option1") {
                    return data.price >= 0 && data.price <= 10;
                } else if (pricefilter === "option2") {
                    return data.price > 10 && data.price <= 200;
                } else if (pricefilter === "option3") {
                    return data.price > 200 && data.price <= 2000;
                }
                return true;
            });
        }

        setdata(filterData);
    }, [category, data1, pricefilter]);

    const abcd = (e) => {
        setpricefilter(e.target.value);
    };

    // useEffect(() => {
    //   if (category === "all") {
    //     setdata(data1)

    //   }
    //   else if (category === "beauty") {
    //     const filterproduct = data1.filter(
    //       (data) => data.category === "beauty"
    //     )
    //     setdata(filterproduct)
    //     setpagenumber(0)
    //   }
    //   else if (category === "fragrances") {
    //     const filterproduct = data1.filter(
    //       (data) => data.category === "fragrances"
    //     )
    //     setdata(filterproduct)
    //     setpagenumber(0)
    //   }
    //   else if (category === "furniture") {
    //     const filterproduct = data1.filter(
    //       (data) => data.category === "furniture"
    //     )
    //     setdata(filterproduct)
    //     setpagenumber(0)
    //   }
    //   else if (category === "groceries") {
    //     const filterproduct = data1.filter(
    //       (data) => data.category === "groceries"
    //     )
    //     setdata(filterproduct)
    //     setpagenumber(0)
    //   }
    // }, [category])

    // ReactPaginate
    const pagePerProducts = 10;
    const visitedPage = pagenumber * pagePerProducts;
    const DisplayProduct = data ? data.slice(visitedPage, visitedPage + pagePerProducts) : [];
    const countPage = data ? Math.ceil(data.length / pagePerProducts) : 0;
    const changePage = ({ selected }) => {
        setpagenumber(selected);
    };

    return (
        <div>
            <div>
                <h3 className="text-center mt-3 shadow">Table from dummy json......</h3>
            </div>
            <div className="">
                <section className="container pt-4">
                    <div className="row">
                        <div className="col-12 mt-3">
                            <div className="row justify-content-between">
                                <div className="col-6">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" onChange={abcd} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                                        <label className="form-check-label" for="inlineRadio1">
                                            $0-$10
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" onChange={abcd} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                                        <label className="form-check-label" for="inlineRadio2">
                                            $11-$200
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" onChange={abcd} type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"></input>
                                        <label className="form-check-label" for="inlineRadio3">
                                            $201-$2000
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" onChange={abcd} type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option4"></input>
                                        <label className="form-check-label" for="inlineRadio4">
                                            $0-$2000
                                        </label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <input value={searchProduct} onChange={(e) => setsearchProduct(e.target.value)} placeholder="i am lookin for...."></input>
                                </div>
                                <div className="col-3 w-50 mt-4">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        onClick={(e) => {
                                            setcategory(e.target.value);
                                        }}
                                    >
                                        <option value="all">All</option>
                                        <option value="beauty">beauty</option>
                                        <option value="fragrances">fragrances</option>
                                        <option value="furniture">furniture</option>
                                        <option value="groceries">groceries</option>
                                    </select>
                                </div>
                            </div>
                            <table className="table border mt-4 ">
                                <thead className="col-12 table-dark">
                                    <tr>
                                        <th className="col-1">ID</th>
                                        <th className="col-3">TITLE</th>
                                        <th className="col-1">PRICE</th>
                                        <th className="col-2">CATEGORY</th>
                                        <th className="col-2">REVIEWERNAME</th>
                                        <th className="col-2">REVIEWEREMAIL</th>
                                    </tr>
                                </thead>

                                {/* map method */}

                                {(searchProduct === ""
                                    ? DisplayProduct
                                    : data.filter((item) => {
                                          if (item.title.toLowerCase().includes(searchProduct.toLowerCase())) {
                                              return item;
                                          }
                                      })
                                ).map((value, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <th className="col-1">{value.id}</th>
                                                <td className="col-3">{value.title}</td>
                                                <td className="col-1">{value.price}</td>
                                                <td className="col-2">{value.category}</td>
                                                <td className="col-3">{value.reviews[0].reviewerName}</td>
                                                <td className="col-3">{value.reviews[0].reviewerEmail}</td>
                                            </tr>
                                        </tbody>
                                    );
                                })}
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <div className="container">
                <ReactPaginate pageCount={countPage} onPageChange={changePage} className="paginationBttns"></ReactPaginate>
            </div>
        </div>
    );
};
export default App;
