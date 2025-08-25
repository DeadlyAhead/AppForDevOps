FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY Backend.csproj .
RUN dotnet restore "Backend.csproj"

COPY . .

RUN dotnet publish "Backend.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0

RUN if command -v apt-get >/dev/null; then \
        apt-get update && apt-get install -y -qq --no-install-recommends \
        curl \
        libicu-dev \
        libpq5 \
        ca-certificates \
        && rm -rf /var/lib/apt/lists/*; \
    elif command -v yum >/dev/null; then \
        yum install -y curl postgresql-libs libicu ca-certificates && yum clean all; \
    fi

WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Backend.dll"]