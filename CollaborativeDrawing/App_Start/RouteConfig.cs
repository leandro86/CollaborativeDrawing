using System.Web.Routing;

namespace CollaborativeDrawing
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapPageRoute("", "{canvasId}", "~/index.aspx");
            routes.MapPageRoute("", "", "~/index.aspx");
        }
    }
}