FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY Backend/Backend.csproj Backend/
RUN dotnet restore "Backend/Backend.csproj"

COPY Backend/. Backend/
WORKDIR "/src/Backend"
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0

RUN apt-get update && apt-get install -y curl libpq5 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Backend.dll"]