/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {instance} from "../../services/axios/instance";
import {ProductCard} from "../../components/category-product/productCard";
import {authContext} from "../../context/authcontex";
import {Stars} from "../../components/stars/stars";
import Spinner from "react-bootstrap/Spinner";
import {useTranslation} from "react-i18next";
import "./subSubCategory.css";
export const SubSubcategory = () => {
	const [SubSubProducts, setSubSubProducts] = useState([]);

	let {SubSubCategoryID} = useParams();

	const navigate = useNavigate();
	const [price, setPrice] = useState("");
	const [rating, setRating] = useState("");
	const [brand, setBrand] = useState([]);
	const [brandCollection, setBrandCollection] = useState([]);
	const [ArbrandCollection, setArBrandCollection] = useState([]);
	// const [subSubCategories,setSubSubcategories] = useState ([])
	const [loadingBrands, setLoadingBrands] = useState(false);
	const [loading, setLoading] = useState(false);
	const {lang} = useContext(authContext);
	const {t} = useTranslation();

	// useEffect(() => {
	//     document.title = `Amazon - ${categoryName}`;
	//     window.scrollTo({ top: 0, behavior: "smooth" });
	//     instance
	//         .get(`products/category/${categoryID}`)
	//         .then((res) => {
	//             // console.log(res.data.products);
	//             setCategoryProducts(res.data.data);
	//             // console.log(res.data.data);
	//         })
	//         .catch((err) => {
	//             navigate("/");
	//         });
	// }, [categoryID, navigate, categoryName]);
	// console.log(categoryname);

	useEffect(() => {
		// document.title = `Amazon - ${categoryName}`;
		window.scrollTo({top: 0, behavior: "smooth"});
		fetchProducts();

		// }, [SubCategoryID, navigate, categoryName]);
	}, [SubSubCategoryID, navigate]);

	let fetchProducts = async (params) => {
		setLoading(true);
		try {
			const res = await instance.get(
				`/products/subSubCategory/${SubSubCategoryID}`,
				{
					params: {
						...params,
					},
				}
			);
			setSubSubProducts(res.data.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);

			//   navigate("/");
		}
	};

	useEffect(() => {}, [SubSubProducts]);

	const generateBrands = (data) => {
		// const uniqueBrands = Array.from(
		//   // new Set(categoryProducts.map((product) => product.brand))
		//   new Set(categoryProducts.map((product) => lang === "en" ? product.en?.brand:product.ar?.brand))
		// );
		// setBrandCollection(uniqueBrands);

		const enBrands = Array.from(
			new Set(data.map((product) => product.en.brand))
		);
		setBrandCollection(enBrands);

		const arBrands = Array.from(
			new Set(data.map((product) => product.ar.brand))
		);
		setArBrandCollection(arBrands);
	};

	useEffect(() => {
		setLoadingBrands(true);
		instance
			.get(`/products/subSubCategory/${SubSubCategoryID}`)
			.then((res) => {
				generateBrands(res.data.data);
				setLoadingBrands(false);
			});
	}, []);
	const handlePriceChange = (event) => {
		setPrice(event.target.value);
	};

	const handleRatingChange = (event) => {
		setRating(event.target.value);
	};

	const handleBrandChange = (event) => {
		// setBrand(event.target.value);
		// let value = (lang ==="en" ? event.target.value : event.target.value)
		let value = event.target.value;
		if (value === "") {
			setBrand([]);
		} else if (event.target.checked === true) {
			setBrand([...brand, value]);
		} else if (event.target.checked === false) {
			const newArr = brand.filter((e) => e !== value);
			// setBrand(newArr);
			// setBrand([...brand,newArr]);
			setBrand([...newArr]);
		}
	};

	useEffect(() => {
		applyFilters();
	}, [price, rating, brand]);

	let params = [];
	const applyFilters = () => {
		// let params = [];
		if (price <= 10000 && price !== "") {
			console.log(price);
			params["price[lte]"] = price;
		} else if (price > 10000) {
			console.log(price);
			params["price[gte]"] = price;
		}
		if (rating) {
			params.rating = rating;
		}
		if (brand) {
			// lang === "en"? params.brand =brand: params.brand =brand
			// params.brand = brand;
			params[lang === "en" ? "en.brand" : "ar.brand"] = brand;
		}

		fetchProducts(params);
	};

	// const [catogories, setCatogories] = useState([]);
	// useEffect(() => {
	//     instance
	//         .get("category")
	//         .then((res) => {
	//             // console.log(res.data);
	//             setCatogories(res.data);
	//             // setCategoryProducts(res.data.data);
	//             // console.log(res.data.data);
	//         })
	//         .catch((err) => {
	//             console.log(err);
	//         });
	// }, []);

	// var categoryName;
	// for (const category in catogories) {
	//     // console.log(categoriesArr[category].id, categoryID);
	//     if (catogories[category]._id === categoryID) {
	//         categoryName = catogories[category].name;
	//     }
	// }
	// console.log(categoryProducts);

	return (
		// <></>
		<section className='container-fluid'>
			<div className='row mt-2 mb-2'>
				<div className='col-lg-2 col-md-12 filter'>
					<div>
						{/* <h3>{categoryName} </h3> */}
						<h4 className='mt-3'>
							{t("category.part4")}
						</h4>{" "}
						<div className='d-flex ms-2'>
							<input
								type='radio'
								name='rating'
								value=''
								className='price-rating'
								onChange={handleRatingChange}
							/>
							<label className='d-block fs-6 ms-2 mt-1'>
								{t("category.part6")}
							</label>
						</div>
						<div className='d-flex'>
							<label className='d-block fs-6 ms-2 mt-1 pe-1'>
								<input
									type='radio'
									name='rating'
									value={5}
									onChange={
										handleRatingChange
									}
								/>
							</label>
							<Stars
								starSize={24}
								productRating={5}
							/>
						</div>
						<div className='d-flex'>
							<label className='d-block fs-6 ms-2 mt-1 pe-1'>
								<input
									type='radio'
									name='rating'
									value={4}
									onChange={
										handleRatingChange
									}
								/>
							</label>
							<Stars
								starSize={24}
								productRating={4}
							/>
						</div>
						<div className='d-flex'>
							<label className='d-block fs-6 ms-2 mt-1 pe-1'>
								<input
									type='radio'
									name='rating'
									value={3}
									onChange={
										handleRatingChange
									}
								/>
							</label>
							<Stars
								starSize={24}
								productRating={3}
							/>
						</div>
						<div className='d-flex'>
							<label className='d-block fs-6 ms-2 mt-1 pe-1'>
								<input
									type='radio'
									name='rating'
									value={2}
									onChange={
										handleRatingChange
									}
								/>
							</label>
							<Stars
								starSize={24}
								productRating={2}
							/>
						</div>
						<div className='d-flex'>
							<label className='d-block fs-6 ms-2 mt-1 pe-1'>
								<input
									type='radio'
									name='rating'
									value={1}
									onChange={
										handleRatingChange
									}
								/>
							</label>
							<Stars
								starSize={24}
								productRating={1}
							/>
						</div>
						<div className='mt-3'>
							<h4>{t("category.part7")}</h4>
							<div className='d-flex'>
								<label className='d-block fs-6 ms-2 mt-1 pe-1'>
									<input
										className='price-rating'
										type='radio'
										name='price'
										value={""}
										onChange={
											handlePriceChange
										}
									/>
									{t("category.part8")}
								</label>{" "}
							</div>
							<div className='d-flex'>
								<label className='d-block fs-6 ms-2 mt-1 pe-1'>
									<input
										className='price-rating'
										type='radio'
										name='price'
										value='100'
										onChange={
											handlePriceChange
										}
									/>
									{t("category.part9")}
								</label>
							</div>
							<div className='d-flex'>
								<label className='d-block fs-6 ms-2 mt-1 pe-1'>
									<input
										className='price-rating'
										type='radio'
										name='price'
										value='300'
										onChange={
											handlePriceChange
										}
									/>
									{t("category.part10")}
								</label>
							</div>
							<div className='d-flex'>
								<label className='d-block fs-6 ms-2 mt-1 pe-1'>
									<input
										className='price-rating'
										type='radio'
										name='price'
										value='1000'
										onChange={
											handlePriceChange
										}
									/>
									{t("category.part11")}
								</label>
							</div>
							<div className='d-flex'>
								<label className='d-block fs-6 ms-2 mt-1 pe-1'>
									<input
										className='price-rating'
										type='radio'
										name='price'
										value='3000'
										onChange={
											handlePriceChange
										}
									/>
									{t("category.part12")}
								</label>
							</div>
							<div className='d-flex'>
								<label className='d-block fs-6 ms-2 mt-1 pe-1'>
									<input
										className='price-rating'
										type='radio'
										name='price'
										value='5000'
										onChange={
											handlePriceChange
										}
									/>
									{t("category.part13")}
								</label>
							</div>{" "}
							<div className='d-flex'>
								<label className='d-block fs-6 ms-2 mt-1 pe-1'>
									<input
										className='price-rating'
										type='radio'
										name='price'
										value='10000'
										onChange={
											handlePriceChange
										}
									/>
									{t("category.part14")}
								</label>
							</div>
							<div className='d-flex'>
								<label className='d-block fs-6 ms-2 mt-1 pe-1'>
									<input
										className='price-rating'
										type='radio'
										name='price'
										value='10001'
										onChange={
											handlePriceChange
										}
									/>
									{t("category.part15")}
								</label>
							</div>
							<br />
							<h4>{t("category.part16")}</h4>
							{loadingBrands ? (
								<Spinner
									style={{
										color: "#FF9900",
									}}
									className='m-auto'
									animation='border'
									role='status'></Spinner>
							) : (
								brandCollection.map((bd) => (
									<label
										key={bd}
										className='d-block fs-6 ms-2'>
										<input
											className='price-rating'
											type='checkbox'
											value={bd}
											onChange={
												handleBrandChange
											}
											// checked={brand.includes(bd)}
										/>
										{bd}
									</label>
								))
							)}
						</div>
					</div>
				</div>
				<div className='col-lg-10 col-md-12'>
					{/* <h3>{categoryName}</h3> */}
					<div className='row mt-5'>
						<div className='col-12'>
							<p>
								5-5 of over{" "}
								{SubSubProducts.length} results
								for &nbsp;
								<span className='text-danger'>
									{/* {categoryName} */}
								</span>
							</p>
						</div>
					</div>
					<div className='row'>
						{" "}
						{loading ? (
							<div className='m-auto d-flex vh-100'>
								<Spinner
									style={{color: "#FF9900"}}
									className='m-auto'
									animation='border'
									role='status'></Spinner>
							</div>
						) : SubSubProducts.length > 0 ? (
							SubSubProducts.map(
								(product, index) => (
									// return (
									<ProductCard
										key={index}
										productID={
											product._id
										}
										productTitle={
											lang === "en"
												? product
														.en
														?.title
												: product
														.ar
														?.title
										}
										productRating={
											product.rating
										}
										productDiscount={
											product.discountPercentage
										}
										productThumbnail={
											product.thumbnail
										}
										productPrice={
											product.price
										}
										productDescription={
											lang === "en"
												? product
														.en
														?.description
												: product
														.ar
														?.description
										}
										productBrand={
											lang === "en"
												? product
														.en
														?.brand
												: product
														.ar
														?.brand
										}
									/>
								)
							)
						) : (
							<h5>{t("category.part17")}</h5>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
