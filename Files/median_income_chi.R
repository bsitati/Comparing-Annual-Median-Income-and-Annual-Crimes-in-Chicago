# install.packages('tigris')
# install.packages('acs')
# install.packages('leaflet')
#install.packages('GISTools')
#install.packages('rgdal')
#install.packages('geojsonio')

library(tigris)
library(sp)
library(tidyverse)
library(geojsonio)

<<<<<<< HEAD
chi <- tracts(state = 'IL', county = c('Cook'), year=2014)
=======
chi <- tracts(state = 'IL', county = c('Cook'), year=2018)
>>>>>>> b41812ab90223e7510d4114224e9de4f12a74367
top1<- head(chi,1)

plot(chi)
tx_counties <- counties(state = 'IL', cb = TRUE, resolution = '20m')
plot(tx_counties)
wtx_counties <- c('Cook')
wtx_roads <- rbind_tigris(
  lapply(
    wtx_counties, function(x) roads(state = 'IL', county = x)
  )
)

# plot(wtx_roads)
library(acs)
library(leaflet)
api.key.install('ade3e21646b21e87eeb0b0e1d634d773dd666ec7')
income_data <- acs.fetch(endyear = 2014,
                         geography = geo.make(state = "IL",
                                              county = c(031),
                                              tract = "*"),
                         variable = "B19013_001")
income_df <- data.frame(paste0(as.character(income_data@geography$state),
                               "0",
                               as.character(income_data@geography$county),
                               income_data@geography$tract),
                        income_data@estimate)
colnames(income_df) <- c("GEOID", "hhincome")

chi_merged <- geo_join(chi, income_df, "GEOID", "GEOID")

<<<<<<< HEAD
geojson_write(chi_merged, file = "chi_merged_2014")
=======
geojson_write(chi_merged, file = "chi_merged_2018")
>>>>>>> b41812ab90223e7510d4114224e9de4f12a74367

pal <- colorQuantile("Greens", NULL, n = 6)
popup <- paste0("Median household income: ", as.character(chi_merged$hhincome))
leaflet() %>%
  addProviderTiles("CartoDB.Positron") %>%
  addPolygons(data = chi_merged,
              fillColor = ~pal(chi_merged$hhincome),
              fillOpacity = 0.7,
              weight = 0.2,
              smoothFactor = 0.2,
              popup = popup) %>%
  addLegend(pal = pal,
            values = chi_merged$hhincome,
            position = "bottomright",
            title = "Income in Chicago")

