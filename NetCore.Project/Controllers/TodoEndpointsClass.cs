using NetCore.Project.Models;
namespace NetCore.Project.Controllers;

public static class TodoEndpointsClass
{
    public static void MapTodoEndpoints (this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/api/Todo", () =>
        {
            return new [] { new Todo() };
        })
        .WithName("GetAllTodos")
        .Produces<Todo[]>(StatusCodes.Status200OK);

        routes.MapGet("/api/Todo/{id}", (int id) =>
        {
            //return new Todo { ID = id };
        })
        .WithName("GetTodoById")
        .Produces<Todo>(StatusCodes.Status200OK);

        routes.MapPut("/api/Todo/{id}", (int id, Todo input) =>
        {
            return Results.NoContent();
        })
        .WithName("UpdateTodo")
        .Produces(StatusCodes.Status204NoContent);

        routes.MapPost("/api/Todo/", (Todo model) =>
        {
            //return Results.Created($"/Todos/{model.ID}", model);
        })
        .WithName("CreateTodo")
        .Produces<Todo>(StatusCodes.Status201Created);

        routes.MapDelete("/api/Todo/{id}", (int id) =>
        {
            //return Results.Ok(new Todo { ID = id });
        })
        .WithName("DeleteTodo")
        .Produces<Todo>(StatusCodes.Status200OK);
    }
}
