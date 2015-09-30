using System.Web.Routing;
using CollaborativeDrawing;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Newtonsoft.Json;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace CollaborativeDrawing
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var settings = new JsonSerializerSettings {ContractResolver = new SignalRContractResolver()};
            var serializer = JsonSerializer.Create(settings);
            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => serializer);

            RouteConfig.RegisterRoutes(RouteTable.Routes);
            app.MapSignalR();
        }
    }
}