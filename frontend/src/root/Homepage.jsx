import React, { useContext } from "react";
import { Navbar } from "../components/Navbar";
import HomepageCards from "../components/HomepageCards";
import { QueryContext } from "../components/QueryContext";
import { RecipeContext } from "../components/RecipeContext";
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
  const { setSearchRequested } = useContext(QueryContext);
  const { setRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();

  const handleSearchSubmit = (query) => {
    setSearchRequested(query);
  };

  const handleCardClick = (recipe) => {
    setRecipe(recipe);
    navigate(`/Recipes/detail/${recipe.id}`);
  };

  const dailyLunchRecipe = {
    id: "f21e59098088407c86c61077de24c6be",
    image: "https://edamam-product-images.s3.amazonaws.com/web-img/de0/de0f127d3962e6afcbc0bf77a4b9df98.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLWVhc3QtMSJIMEYCIQCtgfycLO%2FRqd1z0TF8RGWU2S9aq0fcgPvl2Km50VpWZwIhAPu3%2BwmgM9uDTalwaoOfKj1qQufh%2F19aoyXbF%2Bf2suJ8KsIFCNz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTg3MDE3MTUwOTg2Igxrds%2BsK6wZFX2LqYMqlgXt7q1nXDSZMEpjlPLiCnlmgohubscyBIR4%2FXJ0GAr8G4lvt5k2EOAy0uh4CGIowt7dYBt1v4xQDzRaihy5QJnf1PXeEmcphS4qKbfW2IWeZAUrU48SZ%2FCxrXaSuZT%2BwQTM3Y8PYWnnS%2F2NK5RrfEkniKT%2BWSCc64A2sEFAzhKT03laFt1WBHAhDwv6eBYplIEh22by9fewPd3TrluuOeZy4bzt4wc4wnaWgMzcMHy9BZcMxad%2FXkYQf8JjuJoeiOweiu5PTxCp%2BKGclnhDAjVQYjdU6Hr5fCzO7KcgQbBaGHd5szqayNPDFkMwFHjfbCzrbHNgmZidvsLfWHVEIraN5yw3wDzyvjgqUMunlCG4HzXHMUj1p8fsoIXtpWSEdPo3TbMxoUBwz%2FDjyA7BIIi5I%2FvhgJLon17kKs1SoUxRQcorKyqZFFjpoB%2Bu8e8eVVtw87b5CcudL8QNtSMda9EDhrw5Df%2BP6dlV5b71rOOzDMofMiS41j%2BU0VSN2P4Us0p2J8Gr7zOJq7db%2FbTfdaecpyKbn0t6hiGgW2hpfaToL9C6OZu3k2xmbpciMr3iqpX5tlXkhkRXmNPMPtVa4BehAg9TcBuz8MliIPBbN1jIVXtSracJEA8y53TVHfy1t8guboCmbISkLJkJDRpIZM%2F7QiZG4ie%2Fs1SrbZpE9PI%2Ba45rkpnSJ2MiMWQqDdnyoVJnCM%2FaDWvy2bOwElO9qcLGr23qxeWKcMtzuZz%2BOGjY0HCWAV%2Fa6qZpCeUBrKeiC21YkL%2FxbQ0%2BDIk0Kw7wG6Pspdyc6xQUn9%2F%2BHgfgGu3TuCM8LL6efnbhiuSX7iLd5E92ahmR0tlTLVzThDsVNO27dYAT9YtwCdkjGcPdMIelo8tN7LTh7DDY%2FYezBjqwAQQrMfHhtZLSAZVhOupexw4tk7cITGiNCKWCi9h4XGrdjP4TeeuL1r%2Bd3%2Bw0Fh1n70gsZrWwQAL2GG2baWOePIPQHVDWQdSgFNznRxnf2lha1yrwosDf2PWKzZvO3jDrI0SQUQ6p9CbW2TkjXxdEXJAXQd8a8V3X0ZmG9W3qreb9Ke795bGXV0GSDID5%2F8dQwzubLhHabmlERYwe6SHB8bspvPxyvbtbeMjKHQZPVgse&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240606T185154Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFAZGVSWP5%2F20240606%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=87b1f1f586f56cc2d4e6f610c996d4462206dbee314ef5f674f0336433c22a7f",
    title: "Pasta with Dandelion Greens",
    author: "Food52",
    rating: 4.5,
    totalTime: "Total time not provided.",
  };

  const dailyDinnerRecipe = {
    id: "b2c00994499f1db95fa5fe614468adf2",
    image: "https://edamam-product-images.s3.amazonaws.com/web-img/dd0/dd08252bd41c51bc96b9d491fd296a17.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLWVhc3QtMSJHMEUCIBGzy7UKoZDm4LNcQQVrEiZTIerDMXvhVhodFB0yzFRvAiEAnpmYkH8aXckJ%2BIzN05LLk5l%2B5k6G70QTHYH1SPabPL4qwQUI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDCLWFNY2DlCzqi3m1yqVBQU6Pfcoofpap5uB66vQWl3t558fvda3Vf0uhQ%2FtPA5kOT3j02onMxnlMm4mQCokvUAzKOHvrRZ8bJZh6fXGPMQG2mHj9t5PzAo%2BIBYnJ7fouXsoMzwQ4pxROLR3NKVoexSd89ToCZgMdhARpZ%2FTbHgHReJa6C0oNz2%2Fihaq6GcAw2X0ay0MSgnB0tdo9C%2Fz%2BbfXmQMIGTIvikKwbbK8bSAINDQyuRFFAKmnGds%2BzXRYBxGq9869N9JnPWel4ZbjS6aTo9Q1pBrdSSYSPR%2Bm2DAbjxNLqHuteDV7bwcHhLSUakrk03j%2BWkhtjmqsZnh2aII0PfSHR5TdnJ5R1EC4DT7Cco7eYSEMyCPXPCzi1VK8VUnO4rY5jL0nPjhaZlUfB8Tjf22ZGcvWgje%2BpiUZadSGYM%2FLjpuqc1banjDtBCCXbpzmiQdapqlwa0KG%2FB%2BfQXV60%2BP9y3ZS0gMCJFnX0OGkxpJJMH50TiKGM67D76eiEBC1qCZvC5eFmKcH2K1aT1%2FXduLfsv7h7BxooM1AOtf9Flrej8tsBqp9IOmMe2DGEdTz099VUnrHiQnELAks2L53ZVR9L7DZ2G3q4PNhqkmJvdpKieFfK9GwKM7iNlFf69xjgkmskM1wv%2Fbl3U5JVvGjUFxzUaMxQ1WzyD%2FfMPgC%2FwBBSlWrBCiKizYBg7hVdgIUHHGz3itm20qko7sabG6P06dKZHVhPxWXqpadFpF%2B%2FHgM2uwbKIbi99QS8NZER2wdh96%2FKXp9jZDL%2B2Yzbs43QwQ9CpfJ2kh1Xr1yVHYzyXGsiYIdIoNvvPUYrPIk8z2KH0yldEnFRVDNvTp1KIirS6ds9qU2aQGTxpf4Mcl8%2BcsDK%2Bi0eomuBK%2FSWupKF45BREkw2fqHswY6sQGsC72donowuXCe12bMZJRUDy4jxFQvXDEfZuuWW7hgRnsNjljv%2BXAOE3aPn6qDW27hRvvD9c3vNgm%2BnmsdOSIizi%2BJGbj7OGEOnGbJtJBnJlB%2Fq3IMO%2BPUPbUe8Ux6ItzJgujcAH56YXpa2nv0ZPHvAYiTHkGz8DElyZpzqiszY%2BxWTN5OyR%2BJFuBaYymnp7Izzi6x5vELiqFkWRtaZ17s7ZqIkCcytKHKW7W9XzQfZFY%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240606T185618Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIWMBYMXJ%2F20240606%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=207c07f773e44317d7581c8853ccbcbe16283849bcd02ee39ef07d58b09b8b4d",
    title: "Pink Walnut Pasta",
    author: "Food52",
    rating: 4.5,
  };

  const exploreCard = {
    image: "https://richanddelish.com/wp-content/uploads/2022/03/marble-loaf-cake.png",
    title: "Go To Explore",
    motto: "Taste Some New Flavors",
    link: "/Recipes/q="
  };

  const createCard = {
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2022/09/oatmeal-pancakes.jpg",
    title: "Create Recipe",
    motto: "Create a New Recipe",
    link: "/CreateRecipe"
  };

  const cookbookCard = {
    image: "https://www.cookingclassy.com/wp-content/uploads/2019/11/best-salad-7.jpg",
    title: "Go to Your Cookbook",
    motto: "See Your Recipes",
    link: "/YourCookbook"
  };

  return (
    <>
      <Navbar current="Home" onSearchSubmit={handleSearchSubmit} />
      <div className="page-container">
        <h1>Welcome to Tastetopia!</h1>

        <div className="daily-cards-container">
          <div onClick={() => handleCardClick(dailyLunchRecipe)}>
            <HomepageCards cardInfo={{ category: "Lunch", recipe: dailyLunchRecipe }} variant="daily" />
          </div>
          <div onClick={() => handleCardClick(dailyDinnerRecipe)}>
            <HomepageCards cardInfo={{ category: "Dinner", recipe: dailyDinnerRecipe }} variant="daily" />
          </div>
        </div>

        <div className="quick-link-container">
          <HomepageCards cardInfo={exploreCard} variant="quickLink" />
          <HomepageCards cardInfo={createCard} variant="quickLink" />
          <HomepageCards cardInfo={cookbookCard} variant="quickLink" />
        </div>
      </div>
    </>
  );
};
