import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import { useGetProductsQuery } from "states/api";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[100]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          sx={{ mb: "1.5rem" }}
          component="div"
          color={theme.palette.secondary[400]}
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products"></Header>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          { data || !isLoading ?
            data.map((product) => {
              const { 
                _id,
                name,
                description,
                price,
                rating,
                category,
                supply,
                stat,
            } = product
              return (<Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />)
            }) :(
              [1, 2, 3, 4, 5, 6].map(n => <Skeleton key={n} variant="rectangular" width={268.59} height={233.27} />)
            )
          }
        </Box>
    </Box>
  );
};

export default Products;
