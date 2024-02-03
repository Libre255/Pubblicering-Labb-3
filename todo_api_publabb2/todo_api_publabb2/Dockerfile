#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["todo_api_publabb2.csproj", "todoapi/"]
RUN dotnet restore "todoapi/todo_api_publabb2.csproj"
COPY . todoapi/
WORKDIR /src/todoapi
RUN dotnet build "todo_api_publabb2.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "todo_api_publabb2.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "todo_api_publabb2.dll"]