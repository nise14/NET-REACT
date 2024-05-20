using server.crudproject.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ReactDbContext>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var allowedHosts = builder.Configuration.GetSection("AllowedHosts")!.Value!.Split(';');
app.UseCors(builder => builder.WithOrigins(allowedHosts)
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin());

app.Run();
