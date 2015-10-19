using System.Collections.Concurrent;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Server.Models;

namespace Server.Hubs
{
    public class DrawingHub : Hub
    {
        private static readonly ConcurrentDictionary<string, Canvas> ConnectionsToCanvas = new ConcurrentDictionary<string, Canvas>();
        private static readonly ConcurrentDictionary<string, Canvas> Canvases = new ConcurrentDictionary<string, Canvas>();

        public void DrawLine(Line line)
        {
            Canvas canvas;
            if (ConnectionsToCanvas.TryGetValue(Context.ConnectionId, out canvas))
            {
                canvas.Lines.Add(line);
                Clients.OthersInGroup(canvas.Id).drawLine(line);
            }
        }

        public override async Task OnConnected()
        {
            string canvasId = Context.QueryString["canvasId"];
            string connectionId = Context.ConnectionId;

            if (string.IsNullOrEmpty(canvasId))
            {
                canvasId = "default";
            }

            Canvas canvas = Canvases.GetOrAdd(canvasId, _ => new Canvas() {Id = canvasId});
            ConnectionsToCanvas.TryAdd(connectionId, canvas);

            lock (canvas.ConnectionsId)
            {
                canvas.ConnectionsId.Add(connectionId);
            }

            Clients.Caller.setInitialState(canvas.Lines);
            await Groups.Add(Context.ConnectionId, canvas.Id);

            Clients.Group(canvas.Id).updateUsersInCanvas(canvas.ConnectionsId.Count);

            await base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            string connectionId = Context.ConnectionId;

            Canvas canvas;
            if (ConnectionsToCanvas.TryRemove(connectionId, out canvas))
            {
                lock (canvas.ConnectionsId)
                {
                    canvas.ConnectionsId.Remove(connectionId);

                    if (canvas.ConnectionsId.Count == 0)
                    {
                        Canvas removedCanvas;
                        Canvases.TryRemove(canvas.Id, out removedCanvas);
                    }
                    else
                    {
                        Clients.OthersInGroup(canvas.Id).updateUsersInCanvas(canvas.ConnectionsId.Count);
                    }
                }
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}