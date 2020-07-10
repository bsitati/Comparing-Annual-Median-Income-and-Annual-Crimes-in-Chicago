# install.packages('tigris')
# install.packages('acs')
# install.packages('leaflet')
install.packages('GISTools')
install.packages('rgdal')

library(tigris)
library(sp)
library(tidyverse)

chi <- tracts(state = 'IL', county = c('Cook'))
top1<- head(chi,1)


write.csv(chi,"chi2018geodata.csv", row.names = FALSE)



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
income_data <- acs.fetch(endyear = 2018,
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

write.csv(income_df,"chi2015incomedata.csv", row.names = FALSE)


chi_merged <- geo_join(chi, income_df, "GEOID", "GEOID")



write.csv(chi_merged,"chi2018_merged.csv", row.names = FALSE)

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

