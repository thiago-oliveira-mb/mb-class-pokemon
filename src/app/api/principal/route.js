import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

export async function GET() {
  try {
    const data = JSON.parse(await fs.readFile(dbPath, "utf-8"));
    return Response.json(data.principal);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Erro ao ler o arquivo" }), {
      status: 500,
    });
  }
}

export async function PUT(request) {
  try {
    const { name } = await request.json();
    const data = JSON.parse(await fs.readFile(dbPath, "utf-8"));
    data.principal = { name };
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
    return Response.json({ success: true });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar o arquivo" }),
      { status: 500 }
    );
  }
}
