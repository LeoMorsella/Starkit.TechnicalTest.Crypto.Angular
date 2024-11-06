# Starkit angular technical test

Justificacion de decisiones:

A modo del componente padre se hace uso del currencies, el cual obtendra las monedas de la API indicada, luego se considero viable hacer uso de componente hijo al currency-info el cual al hacer click permitira la obtencion de los detalles de la moneda en cuestion
Debido a que la api provista para el Market Overview se encontraba caida, se hizo uso de un reemplazo, https://api.coingecko.com/api/v3/global. La misma traera los datos generales del mercado obteniendo asi valores referentes:

	- Porcentaje de capitalización de mercado
	- Capitalización de mercado total
	- Volumen total del mercado

Para su ejecucion debera iniciar 
	ng serve (Para la ejecucion del sitio)
	ng test (Para la ejecucion de los test)

